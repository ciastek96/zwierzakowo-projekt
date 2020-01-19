import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Article from 'components/Article/Article';

const articles = [
  {
    id: '1',
    title: 'Sonia',
    created: '3',
    content:
      'Ut dolor sea labore at at, sanctus sanctus elitr kasd voluptua, invidunt tempor et aliquyam tempor lorem, invidunt amet et justo vero dolor voluptua takimata diam diam, et labore eos magna aliquyam dolor ut. Sea tempor diam ut gubergren sed invidunt ea, amet ipsum amet.',
    author: 'Adam',
  },
  {
    id: '2',
    title: 'Max',
    created: '3',
    content:
      'Justo lorem rebum est ipsum no lorem est lorem. Lorem est sea diam invidunt. Dolor sed sed dolores sadipscing takimata est sit ipsum sed, ipsum dolor clita accusam no gubergren..',
    author: 'Kamil',
  },
  {
    id: '3',
    title: 'Sam',
    created: '10',
    content:
      'Amet dolor dolore gubergren tempor ipsum et dolores diam dolores. Voluptua accusam vero elitr dolore sadipscing eirmod stet. Elitr est.',
    author: 'Adam',
  },
  {
    id: '4',
    title: 'Puszek',
    created: '5',
    content:
      'Stet eirmod sit consetetur sit consetetur eos et eos, erat takimata voluptua eirmod amet, labore ea et clita et, et kasd erat voluptua takimata sed vero elitr clita. Et clita erat sed dolor erat et. Ipsum sit clita no sed.',
    author: 'Kamil',
  },
  {
    id: '5',
    title: 'Żako',
    created: '13',
    content:
      'Elitr takimata diam stet gubergren vero sed lorem dolores. No vero ea et ut sit nonumy sed ut. Voluptua et ea sit sanctus eos. Justo et ipsum duo ea sed.',
    author: 'Adam',
  },
];

const PostsView = () => (
  <UserPageTemplate pageType="posts" header="Posty">
    {articles.map(article => (
      <Article
        id={article.id}
        title={article.title}
        created={article.created}
        content={article.content}
        author={article.author}
        key={article.id}
      />
    ))}
  </UserPageTemplate>
);
export default PostsView;
