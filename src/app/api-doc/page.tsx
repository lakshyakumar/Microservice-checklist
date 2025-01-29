import { getApiDocs } from '@/../lib/swagger';
import ReactSwagger from './react-swagger';

export default async function IndexPage() {
  const spec = getApiDocs();
  return (
    <section>
      <ReactSwagger spec={spec} />
    </section>
  );
}
