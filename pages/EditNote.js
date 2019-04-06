import React, {Component} from 'react'
import { Button, View, Text, TouchableOpacity, Image, Keyboard, TextInput, ScrollView, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

class EditNote extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         new_folder: '',
    //         new_note: '',
    //         path: ''
    //     }
    // }

    renameFolder (name) {
        this.props.screenProps.dispatch({
            type: 'RENAME', 
            name: name,
            path: this.state.path
        })
    }

    render() {

        return (
            <View style={{ flex: 1, height: '100%'}}>
                
                {/* <View>
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
                            console.log('select_item', select_item)
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
                style={{flexDirection: 'column', justifyContent: 'space-around', height: 200, paddingHorizontal: 20, borderColor: 'green', borderWidth: 1}}>

                    <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    >
                        <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 30}}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/add-folder.png')}
                            ></Image>
                        </LinearGradient>

                        <TextInput
                        placeholder="Add folder"
                        style={{textAlign: 'center', width: 250, borderBottomColor: '#0e4193', borderBottomWidth: 1}}
                        onChangeText={(text) => this.state.new_folder = text}
                        />


                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    >

                        <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 30}}>
                            <Image
                            style={{width: 18, height: 18}}
                            source={require('../images/add-note.png')}
                            ></Image>
                        </LinearGradient>

                        <TextInput
                        placeholder="Add note"
                        style={{textAlign: 'center', width: 250, borderBottomColor: '#0e4193', borderBottomWidth: 1}}
                        onChangeText={(text) => this.state.new_note = text}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20}}
                    >

                    <LinearGradient colors={['#0e4193', '#07234f']} style={{height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>

                        <Image
                        style={{width: 15, height: 15}}
                        source={require('../images/delete.png')}
                        ></Image>

                    </LinearGradient>


                    </TouchableOpacity>

                </View> */}

            </View>
        )
    }
}

export default EditNote