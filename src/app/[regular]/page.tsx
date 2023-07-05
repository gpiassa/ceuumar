import MDXContent from "@/components/MDXContent";
import {getSinglePage} from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import {RegularPage} from "types";

// remove dynamicParams
export let dynamicParams: boolean;
dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const getRegularPages = getSinglePage("pages");

  const filterRegularPages = getRegularPages.filter(
    (page: RegularPage) => !page.frontmatter.layout
  );

  return filterRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));
};

// for all regular pages
const RegularPages = ({params}: { params: { regular: string } }) => {
  const regularData = getSinglePage("pages");
  const data = regularData.filter(
    (page: RegularPage) => page.slug === params.regular
  )[0];
  const {frontmatter, content} = data;
  const {title, meta_title, description, image} = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title}/>
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegularPages;
