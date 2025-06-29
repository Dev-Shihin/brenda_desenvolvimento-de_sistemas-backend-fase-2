import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseData = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(model) },
          {
            properties: {
              statusCode: { type: 'number', example: 200 },
              message: { type: 'string', example: 'Operação realizada com sucesso' },
            },
          },
        ],
      },
    }),
  );
};