import React, {Component} from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class EditNote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            path: '',
            select_item: {
                description:''
            },
            scroll_view_height: 0,
            edit_description_mode: false,
            description_element: <Text></Text>
        }
    }

    renameNote (name) {
        this.props.screenProps.dispatch({
            type: 'RENAME', 
            name: name,
            path: this.state.path
        })
    }
    editNoteDescription (description) {
        this.props.screenProps.dispatch({
            type: 'EDIT_NOTE_DESCRIPTION', 
            description: description,
            path: this.state.path
        })
    }
    toggleEditDescriptionMode () {
        this.state.edit_description_mode = this.state.edit_description_mode ? false : true
        this.forceUpdate()
    }

    setInputRef = ref => {
        this.inputRef = ref
        const { getRef } = this.props
        if (getRef) {
            getRef(ref)
        }
    }

    componentDidUpdate () {
        if(this.inputRef) {
            this.inputRef.focus()
        }
    }

    render() {

        const { navigation } = this.props
        this.state.select_item = navigation.getParam('select_item')
        this.state.path = navigation.getParam('path_indexes')

        var {height, width} = Dimensions.get('window')
        this.state.scroll_view_height = height - 135

        const {
            nextField
        } = this.props

        if(this.state.edit_description_mode) {
            this.state.description_element = <TextInput
                                multiline={true}
                                style={{width: '100%', height: this.state.scroll_view_height, paddingTop: 10, paddingHorizontal: 10, lineHeight: 20}}
                                onSubmitEditing={() => nextField && nextField.focus()}
                                ref={this.setInputRef}
                                onChangeText={(text) => {
                                    this.state.select_item.description = text
                                }}>
                                {this.state.select_item.description}
                                </TextInput>
        }
        else {
            this.state.description_element = <Text
                                style={{width: '100%', paddingTop: 10, paddingHorizontal: 10, lineHeight: 20, color: 'black'}}
                                >
                                    {this.state.select_item.description}
                                </Text>
        }

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
                                Edit {this.state.select_item.name}
                            </Text>
                        </View>

                        <TouchableOpacity
                        style={{alignItems: 'center', justifyContent: 'center', width: 60, height: 60, right: 0, top: 0, position: 'absolute'}}
                        onPress={() => {
                            this.editNoteDescription(this.state.select_item.description)
                            this.renameNote(this.state.select_item.name)
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
                style={{width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#351651', borderBottomWidth: 1}}>
                    <TextInput
                    style={{textAlign: 'center', width: '100%'}}
                    onChangeText={(text) => this.state.select_item.name = text}>
                        {this.state.select_item.name}
                    </TextInput>
                </View>

                <ScrollView>
                    {
                        this.state.description_element
                    }
                </ScrollView>

                <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20, width: 40, height: 40}}
                onPress={() => {
                    this.toggleEditDescriptionMode.call(this)
                }}
                >
                    <LinearGradient colors={['#351651', '#150920']} style={{height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                        <Image
                        style={{width: 18, height: 18, position: 'absolute'}}
                        source={require('../images/edit.png')}
                        ></Image>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        )
    }
}

export default EditNote