import RefreshListView from "./components/RefreshListView";

const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
};

export { RefreshState, RefreshListView };
