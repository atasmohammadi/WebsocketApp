import * as React from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import type { Order, HomeScreenPropsType } from './types';
import * as actions from './actions';
import styles from './styles';

import {
  makeSelectList,
  makeSelectError,
  makeSelectStatus,
} from './selectors';

function Home(props: HomeScreenPropsType): React.ReactNode {
  const { ordersSubscribe, ordersUnsubscribe, orders, error, status } = props;
  const [searchQuery, updateSearchQuery] = React.useState();
  const ordersArray = Object.values(orders);
  const filteredOrdersArray = searchQuery === 0 ? ordersArray : ordersArray.filter(i => i.price === searchQuery)

  // Subscribe to orders when component mounts and unsubscribe on unmount
  React.useEffect(() => {
    // Subscrive
    ordersSubscribe();

    // Unsubscribe
    return function cleanup() {
      ordersUnsubscribe();
    }
  }, []);

  // Render list item ( order )
  function renderItem({ item }: { item: Order }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => updateSearchQuery(item.price)}>
        <View style={styles.descriptionContainer}>
          {!!item.qty && (
            <Text style={styles.desc}>{item.qty}</Text>
          )}
          {!!item.price && (
            <Text style={styles.desc}>{item.price}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Select an order"
        onChangeText={updateSearchQuery}
        value={searchQuery}
      />
      {/* {error && <Text style={styles.error}>Error: {error}</Text>} */}
      <FlatList
        data={filteredOrdersArray}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.timestamp)}
        extraData={filteredOrdersArray}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = createStructuredSelector({
  orders: makeSelectList(),
  status: makeSelectStatus(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    ordersSubscribe: () => dispatch(actions.ordersSubscribe()),
    ordersUnsubscribe: () => dispatch(actions.ordersUnsubscribe()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, React.memo)(Home);
