import React, {Component} from 'react'
import { View, Text, TouchableOpacity, Image, Keyboard, TextInput, ScrollView, Dimensions } from 'react-native'

import { saveLibraryToJSON, checkJSONFile } from '../common_functions.js'

import LinearGradient from 'react-native-linear-gradient'
var objectPath = require("object-path")


class Library extends Component {

    constructor(props) {
        super(props)
        this.state = {
            add_folder_button: 1,
            text_input_height: 0,
            new_note: '',
            check_JSON: false,
            childs_indexes: ''
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
            path: ''
        })

        this.forceUpdate()
    }

    editPathIndexes (action, index) {

        if(action === 'add') {
            if(this.state.childs_indexes.length === 0) {
                this.state.childs_indexes = `${index}`
            }
            else {
                this.state.childs_indexes += `.${index}`
            }
        }
        else if(action === 'delete') {

        }

    }

    renderLibraryList (childs) {
        let result = <View style={{width: '100%', height: '100%'}}><ScrollView>
            {childs.map((child, index) => {
                return(
                    <View 
                    key={index}
                    style={{borderColor: '#07234f', borderWidth: 1, borderRadius: 1, height: 40, marginLeft: 10, marginRight: 5, marginTop: 10, flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5}}>
                        <TouchableOpacity
                        onPress={() => {

                            console.log('this.state.childs_indexes', this.state.childs_indexes)
                            console.log('go to select folder')
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
                            console.log('got to edit item', this.state.childs_indexes)
                            this.props.navigation.navigate('EditFolder', {
                                "select_item": child,
                                "childs_indexes": this.state.childs_indexes
                            })
                        }}>
                            <LinearGradient colors={['#0e4193', '#07234f']}
                            style={{width: 30, height: 30, alignItems: 'center', borderRadius: 30}}>
                                <Image
                                style={{width: 14, height: 14, position: 'absolute', top: 8}}
                                source={require('../images/edit.png')}
                                ></Image>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )
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
            console.log('remove path')
            let path = navigation.getParam('minus_path')
            navigation.state.params.minus_path = -1
            
            console.log('path', path)
            let length = path.length === 1 ? 0 : -2
            console.log('length', length)
            this.state.childs_indexes = this.state.childs_indexes.slice(0, length)
            console.log('this.state.childs_indexes', this.state.childs_indexes)
        }

        const {
            nextField
        } = this.props;

        if(!this.state.check_JSON) {
            checkJSONFile.call(this)
        }


        // Get need folder
        let need_folder = this.props.screenProps.getState().library
        var return_button = <View></View>

        if(this.state.childs_indexes.length > 0) {
            let indexes = this.state.childs_indexes.split('.')

            console.log('need_folder 1', need_folder)

            indexes.forEach(function(index) {
                console.log('index', index)
                need_folder = need_folder.childs[index]

                console.log('need_folder 2', need_folder)
            })
            console.log('need_folder', need_folder)

            return_button = <TouchableOpacity
                            style={{alignItems: 'center', justifyContent: 'center', width: 60, position: 'absolute', height: 60, zIndex: 2}}
                            onPress={() => {
                                console.log('go back', )

                                this.state.childs_indexes = this.state.childs_indexes.slice(0, -2)
                                this.forceUpdate()
                 
                            }}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/left-arrow.png')}
                            ></Image>
                        </TouchableOpacity>
        }
        need_folder = need_folder.childs

        

        var render_library_list = this.renderLibraryList(need_folder)

        return (
            <View style={{ flex: 1, height: '100%'}}>
                
                <View>
                    <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 60}}>

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


                <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20, width: 40, height: 40}}
                onPress={() => {
                    this.state.add_folder_button = 0
                    this.state.text_input_height = 40
                    this.state.new_note = ''
                    this.inputRef.clear()
                    this.forceUpdate()
                    this.inputRef.focus()
                    
                }}
                >

                    <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, opacity: this.state.add_folder_button}}>
                        
                        <Image
                        style={{width: 18, height: 18, position: 'absolute'}}
                        source={require('../images/add.png')}
                        ></Image>

                    </LinearGradient>

                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', bottom: 0, width: '100%', height: this.state.text_input_height}}
                onPress={() => {
                    this.addFolder(this.state.new_note)
                    saveLibraryToJSON.call(this)
                    this.state.add_folder_button = 1
                    this.state.text_input_height = 0
                    Keyboard.dismiss()
                    this.forceUpdate()
                }}
                >

                    <LinearGradient colors={['#0e4193', '#07234f']} style={{ height: this.state.text_input_height, justifyContent: 'center'}}
                    >

                        <TextInput
                        placeholder="Add note"
                        placeholderTextColor="white"
                        style={{color: 'white', width: 300, paddingLeft: 20}}
                        onSubmitEditing={() => nextField && nextField.focus()}
                        ref={this.setInputRef}
                        onChangeText={(text) => this.state.new_note = text}
                        />

                        <Image
                        style={{width: 18, height: 18, position: 'absolute', right: 15, zIndex:10}}
                        source={require('../images/forward-arrow.png')}
                        ></Image>

                    </LinearGradient>

                </TouchableOpacity>

            </View>
        )
    }
}

export default Library