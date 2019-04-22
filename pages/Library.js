import React, {Component} from 'react'
import { View, Text, TouchableOpacity, Image, Keyboard, TextInput, ScrollView, Dimensions } from 'react-native'
import { checkJSONFile } from '../common_functions.js'
import LinearGradient from 'react-native-linear-gradient'

import Gestures from 'react-native-easy-gestures'
import Draggable from "./Draggable";

class Library extends Component {

    constructor(props) {
        super(props)
        this.state = {
            add_folder_button: 1,
            text_input_height: 0,
            new_folder: '',
            check_JSON: false,
            path_indexes: '',
            input_opacity: 0
        }
    }

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          this._keyboardDidHide.bind(this),
        )
    }
    componentWillUnmount() {
        this.keyboardDidHideListener.remove()
    }
    _keyboardDidHide() {
        const { navigation } = this.props
        console.log('navigation', navigation.state.routeName)
        if(navigation.state.routeName !== 'Library') return
        console.log('this.state', this.state)
        if(this.state.new_folder.length > 0) {
            this.addFolder(this.state.new_folder)
        }
        this.state.add_folder_button = 1
        this.state.text_input_height = 0
        this.forceUpdate()
    }
    addFolder (name) {
        this.props.screenProps.dispatch({
            type: 'ADD_CHILD', 
            child: {
                type: 'folder',
                name: name,
                childs: []
            },
            path: ''
        })
        this.forceUpdate()
    }
    editPathIndexes (action, index) {
        if(action === 'add') {
            if(this.state.path_indexes.length === 0) {
                this.state.path_indexes = `${index}`
            }
            else {
                this.state.path_indexes += `.${index}`
            }
        }
        else if(action === 'delete') {

        }
    }

    renderLibraryList (childs) {
        var {height, width} = Dimensions.get('window')
        let list_height = height - 85

        let result = <View style={{width: '100%', height: list_height}}><ScrollView>
            {childs.map((child, index) => {
                let first_child_margin_top = index === 0 ? 10 : 0
                if(child.type === 'folder') {
                return(

                    <Gestures
                    key={index}
                    scalable={false}
                    rotatable={false}
                    onStart={(event, styles) => {
                        console.log('onStart this.gestures', this.gestures)
                    }}
                    ref={(c) => { this.gestures = c; }}
                    onEnd={(event, styles) => {
                        console.log('onEnd this.gestures', this.gestures)
                        // this.gestures.reset(()=>{})
                    }}
                    >

                    <View 
                    
                    style={{borderColor: '#150920', borderWidth: 1, borderRadius: 1, height: 40, marginLeft: 10, marginRight: 5, marginBottom: 10, marginTop: first_child_margin_top, flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5}}>
                        <TouchableOpacity
                        onPress={() => {
                            this.editPathIndexes('add', index)
                            this.forceUpdate()
                        }}
                        style={{height: '100%', justifyContent: 'center', marginLeft: 10, maxWidth: 250, minWidth: 200}}>
                            <Text style={{color: 'black'}}>
                                {child.name}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{position: 'absolute', right: 10, top: 5}}
                        onPress={() => {
                            this.editPathIndexes('add', index)
                            this.props.navigation.navigate('EditFolder', {
                                "select_item": child,
                                "path_indexes": this.state.path_indexes
                            })
                        }}>
                            <LinearGradient colors={['#351651', '#150920']}
                            style={{width: 30, height: 30, alignItems: 'center', borderRadius: 30}}>
                                <Image
                                style={{width: 14, height: 14, position: 'absolute', top: 8}}
                                source={require('../images/edit.png')}
                                ></Image>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </Gestures>
                )
                }
                else {
                    return(
                        <View 
                        key={index}
                        style={{height: 40, marginLeft: 10, marginRight: 5, marginBottom: 10, marginTop: first_child_margin_top, flexDirection: 'row', paddingVertical: 5}}>

                            <View
                            style={{width: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: 'black', textAlign: 'center'}}>
                                    {'-'}
                                </Text>
                            </View>

                            <TouchableOpacity
                            onPress={() => {
                                this.editPathIndexes('add', index)
                                this.props.navigation.navigate('EditNote', {
                                    "select_item": child,
                                    "path_indexes": this.state.path_indexes
                                })
                            }}
                            style={{height: '100%', justifyContent: 'center', width: 325, borderColor: '#150920', borderWidth: 1, borderRadius: 1, paddingLeft: 10}}>
                                <Text style={{color: 'black'}}>
                                    {child.name}
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                    )
                }
            })}
        </ScrollView></View>
        return result
    }

    setInputRef = ref => {
        this.inputRef = ref;
        const { getRef } = this.props;
        if (getRef) {
            getRef(ref);
        }
    }

    render() {

        const { navigation } = this.props

        if(navigation.getParam('minus_path') && navigation.getParam('minus_path') !== -1) {
            navigation.state.params.minus_path = -1
            this.state.path_indexes = this.state.path_indexes.slice(0, -2)
        }

        const {
            nextField
        } = this.props;

        if(!this.state.check_JSON) {
            checkJSONFile.call(this)
        }

        let need_folder = this.props.screenProps.getState().library
        var return_button = <View></View>
        var add_button_size = 40
        if(this.state.text_input_height !== 40) {
            this.state.add_folder_button = 1
        }
        if(this.state.path_indexes.length > 0) {
            let indexes = this.state.path_indexes.split('.')

            indexes.forEach(function(index) {
                need_folder = need_folder.childs[index]
            })

            return_button = <TouchableOpacity
                            style={{alignItems: 'center', justifyContent: 'center', width: 60, position: 'absolute', height: 60, zIndex: 2}}
                            onPress={() => {
                                this.state.path_indexes = this.state.path_indexes.slice(0, -2)
                                this.forceUpdate()
                            }}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/left-arrow.png')}
                            ></Image>
                        </TouchableOpacity>
            add_button_size = 0
            this.state.add_folder_button = 0
        }
        need_folder = need_folder.childs

        var render_library_list = this.renderLibraryList(need_folder)

        return (
            <View style={{ flex: 1, height: '100%'}}>

                <View>
                    <LinearGradient colors={['#351651', '#150920']} style={{height: 60}}>

                        <View style={{justifyContent: 'center', height: 60}}>
                            <Text style={{color:'white', fontSize: 18, textAlign: 'center'}}>Library</Text>
                        </View>

                        {
                            return_button
                        }

                    </LinearGradient>
                </View>

                <View>
                    {
                        render_library_list
                    }
                </View>

                <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20, width: add_button_size, height: add_button_size}}
                onPress={() => {
                    this.state.add_folder_button = 0
                    this.state.input_opacity = 1
                    this.state.text_input_height = 40
                    this.state.new_folder = ''
                    this.inputRef.clear()
                    this.forceUpdate()
                    this.inputRef.focus()
                }}
                >
                    <LinearGradient colors={['#351651', '#150920']} style={{height: add_button_size, width: add_button_size, alignItems: 'center', justifyContent: 'center', borderRadius: 20, opacity: this.state.add_folder_button}}>
                        <Image
                        style={{width: 18, height: 18, position: 'absolute', opacity: this.state.add_folder_button}}
                        source={require('../images/add.png')}
                        ></Image>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', bottom: 0, width: '100%', height: this.state.text_input_height}}
                onPress={() => {
                    Keyboard.dismiss()
                }}
                >
                    <LinearGradient colors={['#351651', '#150920']} style={{ height: this.state.text_input_height, justifyContent: 'center'}}
                    >

                        <TextInput
                        placeholder="Add note"
                        placeholderTextColor="white"
                        style={{color: 'white', width: 300, paddingLeft: 20}}
                        onSubmitEditing={() => nextField && nextField.focus()}
                        ref={this.setInputRef}
                        onChangeText={(text) => this.state.new_folder = text}
                        />

                        <Image
                        style={{width: 18, height: 18, position: 'absolute', right: 15, zIndex:10, opacity: this.state.input_opacity}}
                        source={require('../images/forward-arrow.png')}
                        ></Image>

                    </LinearGradient>
                </TouchableOpacity>

            </View>
        )
    }
}

export default Library