import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import sleep from 'await-sleep';
import { AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { ObjectLiteral } from '@libs/golbal';

export type ApiConfigParams = {
  timeout?: number;
  authToken?: string;
  params?: ObjectLiteral;
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  auth?: AxiosBasicCredentials;
  headers?: ObjectLiteral;
  throwJsonError?: boolean;
};

@Injectable()
export class HttpClientService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async basicRequest<T>(
    options: AxiosRequestConfig,
    throwJsonError = false,
    enableRetry = false,
    maxRetries = 0,
    retryDelay = 0,
    retryCount = 0,
  ): Promise<AxiosResponse<T> | void> {
    return this.httpService
      .request(options)
      .toPromise()
      .catch(async (error) => {
        if (
          (error.response?.status >= 500 ||
            error.response?.status === 408 ||
            error.code === 'ECONNREFUSED') &&
          enableRetry &&
          maxRetries > retryCount
        ) {
          await sleep(retryDelay);

          this.logger.warn(
            `Unable to connect with API: ${options.method}/${options.url}. Retrying to the API call. Retry count: ${retryCount}. Message: ${error.message || JSON.stringify(error)}`,
          );

          return await this.basicRequest<T>(
            options,
            throwJsonError,
            enableRetry,
            maxRetries,
            retryDelay,
            ++retryCount,
          );
        } else {
          if (throwJsonError) {
            throw {
              data: error.response.data,
              ok: false,
              status: error.response.status,
            };
          }

          const errorMessage = `Unable to connect with API: ${options.method}/${options.url}. Status : ${
            error.response?.status
          }. Message: ${error.message || JSON.stringify(error)}`;

          this.logger.error(errorMessage);

          throw new Error(errorMessage);
        }
      });
  }

  async getApiResponse<T>(
    method: Method,
    url: string,
    data: ObjectLiteral,
    configParams: ApiConfigParams,
  ) {
    const options: AxiosRequestConfig = {
      method,
      params: configParams.params,
      ...(method !== 'GET' && {
        data,
      }),
      timeout: configParams.timeout || 30000,
      url,
      ...(configParams.auth && { auth: configParams.auth }),
      ...((configParams.authToken || configParams.headers) && {
        headers: {
          ...(configParams.authToken && {
            Authorization: configParams.authToken,
          }),
          ...(configParams.headers && configParams.headers),
        },
      }),
    };

    return await this.basicRequest<T>(
      options,
      configParams.throwJsonError,
      configParams.enableRetry,
      configParams.maxRetries,
      configParams.retryDelay,
    );
  }
}
