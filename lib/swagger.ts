import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'University Marks Updaton Sample APP',
        version: '1.0.0',
      },
      security: [],
    },
  });
  return spec;
};
