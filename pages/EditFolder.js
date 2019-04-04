import React, {Component} from 'react'
import { Button, View, Text, TouchableOpacity, Image, Keyboard, TextInput, ScrollView, FlatList } from 'react-native'
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
                childs: []
            },
            path: this.state.path
        })
    }

    render() {

        console.log('render EditFolder this getState', this.props.screenProps.getState().library)

        const { navigation } = this.props
        let select_item = navigation.getParam('select_item')
        console.log('select_item', select_item)
        this.state.path = navigation.getParam('childs_indexes')

        return (
            <View style={{ flex: 1, height: '100%'}}>
                
                <View>
                    <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 60, flexDirection: 'row'}}>

                        <TouchableOpacity
                        style={{alignItems: 'center', justifyContent: 'center', width: 40}}
                        onPress={() => {
                            console.log('go back', this.state.path)
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
                        }}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/check-symbol.png')}
                            ></Image>
                        </TouchableOpacity>

                    </LinearGradient>
                </View>


                <View
                style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>

                    <TextInput
                    style={{textAlign: 'center'}}>
                        {select_item.name}
                    </TextInput>
    
                </View>


                <View
                style={{flexDirection: 'column', justifyContent: 'space-around', height: 200, paddingHorizontal: 20, borderColor: 'green', borderWidth: 1}}>

                    <TouchableOpacity
                        style={{borderWidth: 1, borderColor: 'blue', flexDirection: 'row', alignItems: 'center'}}
                    >
                        <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/add-folder.png')}
                            ></Image>
                        </LinearGradient>

                        <TextInput
                        placeholder="Add folder"
                        style={{textAlign: 'center', borderColor: 'red', borderWidth: 1, width: 300}}
                        onChangeText={(text) => this.state.new_folder = text}
                        />


                    </TouchableOpacity>

                    <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>

                        <Image
                        style={{width: 18, height: 18}}
                        source={require('../images/add-note.png')}
                        ></Image>

                    </LinearGradient>

                    <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>

                        <Image
                        style={{width: 15, height: 15}}
                        source={require('../images/delete.png')}
                        ></Image>

                    </LinearGradient>

                </View>

            </View>
        )
    }
}

export default EditFolder