import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {StyleSheet, Text, View, TextInput} from 'react-native'
import {Button} from 'react-native-elements'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from './saga'
import {makeSelectRepos} from 'containers/MemoApp/selectors'
import {makeSelectUsername} from './selectors'
import {changeUsername} from './actions'
import {loadRepos} from 'containers/MemoApp/actions'
import {createStructuredSelector} from 'reselect'

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Welcome',
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Chat', {user: 'Lucy'})}
                    title="Chat with Lucy"
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={this.props.onChangeUsername}
                    value={this.props.username}
                />
                <Button
                    onPress={this.props.loadRepos}
                    title="Load repos"
                />
                <Text>{JSON.stringify(this.props.repos, null, 2)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: (newUserName) => dispatch(changeUsername(newUserName)),
        loadRepos: () => {
            dispatch(loadRepos())
        }
    }
}

const mapStateToProps = createStructuredSelector({
    username: makeSelectUsername(),
    repos: makeSelectRepos(),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'Home', reducer});
const withSaga = injectSaga({key: 'Home', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomeScreen)