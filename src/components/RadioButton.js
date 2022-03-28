import React, { Component,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class RadioButton extends Component {
	state = {
		value: null,
		key:0,
	};
	
	render() {
		
		const { options, childToParent,value} = this.props;
		
		return (
			<View>
				{options.map(res => {
					return (
						
                        <TouchableOpacity
							onPress={() => {
								[childToParent(res)]
							}}>
								
                            <View key={res} style={styles.container}>
							<View
								style={styles.radioCircle}
								>
									
                                  {value === res && <View style={styles.selectedRb} 
								  />}
							</View>
                            
                            <Text style={styles.radioText}>{res}</Text>
						</View>
                        </TouchableOpacity>
						
					);
				})}
			</View>
		);
		
	}
}

const styles = StyleSheet.create({
	container: {
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
	},
    radioText: {
        marginRight: 35,
        fontSize: 12,
        marginHorizontal:5
    },
	radioCircle: {
		height: 12,
		width: 12,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#3740ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 6,
		height: 6,
		borderRadius: 50,
		backgroundColor: '#3740ff',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});