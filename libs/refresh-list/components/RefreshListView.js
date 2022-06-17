import React, { PureComponent } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RefreshState } from "../constant";

const DEBUG = false;
const log = (text: string) => {
  DEBUG && console.log(text);
};

type Props = {
  refreshState: number,
  onHeaderRefresh?: Function,
  onFooterRefresh?: Function,
  data: Array<any>,

  listRef?: any,

  footerRefreshingText?: string,
  footerFailureText?: string,
  footerNoMoreDataText?: string,
  footerEmptyDataText?: string,

  footerRefreshingComponent?: any,
  footerFailureComponent?: any,
  footerNoMoreDataComponent?: any,
  footerEmptyDataComponent?: any,

  renderItem: Function,
};

class RefreshListView extends PureComponent<Props> {
  static defaultProps = {
    footerRefreshingText: "数据加载中…",
    footerFailureText: "点击重新加载",
    footerNoMoreDataText: "已加载全部数据",
    footerEmptyDataText: "暂时没有相关数据",
  };

  onHeaderRefresh = () => {
    log("[RefreshListView]  onHeaderRefresh");

    if (this.shouldStartHeaderRefreshing()) {
      log("[RefreshListView]  onHeaderRefresh");
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  };

  onEndReached = (info: { distanceFromEnd: number }) => {
    log("[RefreshListView]  onEndReached   " + info.distanceFromEnd);

    if (this.shouldStartFooterRefreshing()) {
      log("[RefreshListView]  onFooterRefresh");
      this.props.onFooterRefresh &&
        this.props.onFooterRefresh(RefreshState.FooterRefreshing);
    }
  };

  shouldStartHeaderRefreshing = () => {
    log("[RefreshListView]  shouldStartHeaderRefreshing");

    if (
      this.props.refreshState == RefreshState.HeaderRefreshing ||
      this.props.refreshState == RefreshState.FooterRefreshing
    ) {
      return false;
    }

    return true;
  };

  shouldStartFooterRefreshing = () => {
    log("[RefreshListView]  shouldStartFooterRefreshing");

    let { refreshState, data } = this.props;
    if (data.length == 0) {
      return false;
    }

    return refreshState == RefreshState.Idle;
  };

  render() {
    let { renderItem, onHeaderRefresh, ...rest } = this.props;

    return (
      <FlatList
        ref={this.props.listRef}
        onEndReached={this.onEndReached}
        onRefresh={onHeaderRefresh ? this.onHeaderRefresh : null}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        {...rest}
      />
    );
  }

  renderFooter = () => {
    let footer = null;

    let {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,

      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent,
    } = this.props;

    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />;
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              if (this.props.data.length == 0) {
                this.props.onHeaderRefresh &&
                  this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
              } else {
                this.props.onFooterRefresh &&
                  this.props.onFooterRefresh(RefreshState.FooterRefreshing);
              }
            }}>
            {footerFailureComponent ? (
              footerFailureComponent
            ) : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerFailureText}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              this.props.onHeaderRefresh &&
                this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
            }}>
            {footerEmptyDataComponent ? (
              footerEmptyDataComponent
            ) : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerEmptyDataText}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent ? (
          footerRefreshingComponent
        ) : (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, { marginLeft: 7 }]}>
              {footerRefreshingText}
            </Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        footer = footerNoMoreDataComponent ? (
          footerNoMoreDataComponent
        ) : (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        );
        break;
      }
    }

    return footer;
  };
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: "#555555",
  },
});

export default RefreshListView;
