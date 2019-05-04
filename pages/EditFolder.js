import React, {Component} from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

class EditFolder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            new_folder: '',
            new_note: '',
            path: ''
        }
    }

    addFolder (name) {
        this.props.screenProps.dispatch({
            type: 'ADD_CHILD', 
            child: {
                type: 'folder',
                name: name,
                childs: []
            },
            path: this.state.path
        })
    }
    addNote (name) {
        this.props.screenProps.dispatch({
            type: 'ADD_CHILD', 
            child: {
                type: 'note',
                name: name,
                description: ''
            },
            path: this.state.path
        })
    }
    renameFolder (name) {
        this.props.screenProps.dispatch({
            type: 'RENAME', 
            name: name,
            path: this.state.path
        })
    }
    deleteFolder () {
        let delete_path = this.state.path.substr(this.state.path.length - 1)
        let parent_path = this.state.path.slice(0, -2)

        this.props.screenProps.dispatch({
            type: 'DELETE_CHILD',
            delete_path: delete_path,
            path: parent_path
        })

        this.props.navigation.navigate('Library', {
            'minus_path': this.state.path
        })
    }
    moveFolder () {
        this.props.navigation.navigate('Library', {
            'minus_path': this.state.path,
            'move': true
        })
    }

    render() {

        const { navigation } = this.props
        let select_item = navigation.getParam('select_item')
        this.state.path = navigation.getParam('path_indexes')

        return (
            <View style={{ flex: 1, height: '100%'}}>
                <View>
                    <LinearGradient colors={['#351651', '#150920']} style={{height: 60, flexDirection: 'row'}}>

                        <TouchableOpacity
                        style={{alignItems: 'center', justifyContent: 'center', width: 40}}
                        onPress={() => {
                            this.props.navigation.navigate('Library', {
                                'minus_path': this.state.path
                            })
                        }}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/left-arrow.png')}
                            ></Image>
                        </TouchableOpacity>

                
                        <View style={{justifyContent: 'center', height: 60, paddingLeft: 10}}>
                            <Text style={{color:'white', fontSize: 18}}>
                                Edit {select_item.name}
                            </Text>
                        </View>

                        <TouchableOpacity
                        style={{alignItems: 'center', justifyContent: 'center', width: 60, height: 60, right: 0, top: 0, position: 'absolute'}}
                        onPress={() => {
                            if(this.state.new_folder.length !== 0) {
                                this.addFolder(this.state.new_folder)
                            }
                            if(this.state.new_note.length !== 0) {
                                this.addNote(this.state.new_note)
                            }
                            this.renameFolder(select_item.name)
                            this.forceUpdate()
                        }}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/check-symbol.png')}
                            ></Image>
                        </TouchableOpacity>

                    </LinearGradient>
                </View>


                <View
                style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                    <TextInput
                    style={{textAlign: 'center', width: '100%'}}
                    onChangeText={(text) => select_item.name = text}>
                        {select_item.name}
                    </TextInput>
                </View>


                <View
                style={{flexDirection: 'column', justifyContent: 'space-around', height: 200, paddingHorizontal: 20}}>

                    <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    >
                        <LinearGradient colors={['#351651', '#150920']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 30}}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/add-folder.png')}
                            ></Image>
                        </LinearGradient>

                        <TextInput
                        placeholder="Add folder"
                        style={{textAlign: 'center', width: 250, borderBottomColor: '#351651', borderBottomWidth: 1}}
                        onChangeText={(text) => this.state.new_folder = text}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    >

                        <LinearGradient colors={['#351651', '#150920']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 30}}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/add-note.png')}
                            ></Image>
                        </LinearGradient>

                        <TextInput
                        placeholder="Add note"
                        style={{textAlign: 'center', width: 250, borderBottomColor: '#351651', borderBottomWidth: 1}}
                        onChangeText={(text) => this.state.new_note = text}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row'}}
                    >

                        <TouchableOpacity
                        style={{marginRight: 20}}
                        onPress={() => {
                            this.moveFolder()
                        }}>
                            <LinearGradient colors={['#351651', '#150920']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                style={{width: 25, height: 25}}
                                source={require('../images/move.png')}
                                ></Image>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={() => {
                            this.deleteFolder()
                        }}>
                            <LinearGradient colors={['#351651', '#150920']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                style={{width: 15, height: 15}}
                                source={require('../images/delete.png')}
                                ></Image>
                            </LinearGradient>
                        </TouchableOpacity>

                        
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default EditFolder