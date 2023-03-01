export type Query = {
    viewer: User
    user(id: ID!): User
    tag(id: String!): Tag
    item(id: String!): Item
    search(query: String!, first: Int, after: String): SearchResults
}

export type User = {
    id: String!
    name: String!
    description: String
    items: [Item!]!
    followers: [User!]!
    followees: [User!]!
    following: Boolean!
}

export type Tag = {
    id: String!
    name: String!
    iconUrl: String
    items: [Item!]!
    followers: [User!]!
}

export type Item = {
    id: String!
    title: String!
    body: String
    user: User!
    tags: [Tag!]!
    likesCount: Int!
    commentsCount: Int!
    createdAt: String!
    updatedAt: String!
    url: string
}

export type SearchResults = {
    items: [Item!]!
    totalCount: Int!
    pageInfo: PageInfo!
}

export type PageInfo = {
    endCursor: String
    hasNextPage: Boolean!
}
