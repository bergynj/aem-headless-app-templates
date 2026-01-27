import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    pageByPath(_path: String!): PageResult
    pageList(filter: PageFilter, limit: Int, offset: Int): PageListResult
    componentByPath(_path: String!): Component
    adventureList: AdventureListResult
  }
  
  type PageResult {
    item: Page
  }
  
  type PageListResult {
    items: [Page]
    total: Int
  }
  
  type Page {
    _path: String!
    _type: String!
    title: String!
    seoTitle: String
    seoDescription: String
    components: [Component]
    children: [Page]
  }
  
  input PageFilter {
    _path: StringFilter
    _type: StringFilter
    title: StringFilter
  }
  
  input StringFilter {
    _expressions: [StringExpression]
  }
  
  input StringExpression {
    value: String
    _operator: String
  }
  
  interface Component {
    _type: String!
    _path: String!
  }
  
  type HeroComponent implements Component {
    _type: String!
    _path: String!
    headline: String
    subheadline: String
    ctaText: String
    ctaUrl: String
    backgroundImage: String
  }
  
  type TextComponent implements Component {
    _type: String!
    _path: String!
    text: String
    richText: Boolean
  }
  
  type AdventureListResult {
    items: [Adventure]
  }
  
  type Adventure {
    _path: String!
    title: String!
    slug: String
    price: String
    tripLength: String
    primaryImage: ImageRef
  }
  
  type ImageRef {
    _path: String!
    mimeType: String
    width: Int
    height: Int
  }
`);
