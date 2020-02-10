import React from 'react';
import UserPageTemplate from 'templates/UserPageTemplate';
import Rank from 'components/Rank/Rank';

const RankView = () => (
  <UserPageTemplate header="Ranking">
    <Rank />
  </UserPageTemplate>
);

export default RankView;
