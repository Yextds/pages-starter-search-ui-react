import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
  HeadlessConfig,
  SandboxEndpoints,
} from "@yext/search-headless-react";
import {
  SearchBar,
  StandardCard,
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  AlternativeVerticals,
  AppliedFilters,
  DirectAnswer,
  LocationBias
} from "@yext/search-ui-react";

import { ProductsCard } from '../components/cards/ProductsCard';
import Navigation from '../components/Navigation';
import PageLayout from "../components/PageLayout";

/**
 * Not required depending on your use case.
 */
// export const config: TemplateConfig = {
//   stream: {
//     $id: "FaqPage",
//     // Specifies the exact data that each generated document will contain. This data is passed in
//     // directly as props to the default exported function.
//     fields: [
//       "id",
//       "uid",
//       "meta",
//       "name",
//     ],
//     // Defines the scope of entities that qualify for this stream.
//     filter: {
//       entityIds: ["siteGlobalData"] 
//     },
//     // The entity language profiles that documents will be generated for.
//     localization: {
//       locales: ["en"],
//       primary: false,
//     },
//   },
// };

export const getPath: GetPath<TemplateProps> = () => {
  return "/products";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: `Turtlehead Tacos Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const headlessConfig: HeadlessConfig = {
  apiKey: "ecbf37a4304b6b390687f68f697210e5",
  experienceKey: "mgm-timber-m",
  locale: "en",
  sessionTrackingEnabled: true,
  verticalKey: "products",
  endpoints: {
    universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch"
  },
};

const searcher = provideHeadless(headlessConfig);

const ProductPage: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {

  const { _site  } = document;

  return (
    <PageLayout _site={_site}>
    <SearchHeadlessProvider searcher={searcher}>
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
			<SearchBar placeholder='Search...' />
      <Navigation />
			<DirectAnswer />
			<SpellCheck />
			<ResultsCount />
			<AppliedFilters hiddenFields={['builtin.entityType']} />			
			<VerticalResults CardComponent={ProductsCard} />
			<LocationBias />
        </div>
        <Pagination />
      </div>
    </SearchHeadlessProvider>
    </PageLayout>
  );
};

export default ProductPage;
