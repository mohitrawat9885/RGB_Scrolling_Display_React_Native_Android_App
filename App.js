import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import io from 'socket.io-client';
// import ColorPicker from 'material-ui-color-picker'
// import { SketchPicker } from 'react-color'
import ColorPicker from 'react-native-wheel-color-picker';
import Slider from 'react-native-slider';
const socket = io('http://192.168.43.14:5000');



export default function App() {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState([]);
  const [speed, setSpeed] = useState(200);
  // const [color, setColor] = useState('#ffffff');
  const [textColors, setTextColors] = useState([''])
  const [textColorsId, setTextColorId] = useState(0);


  // useEffect(() => {
  //   // socket.on('receive message', (message) => {
  //   //   setMessages((prevMessages) => [...prevMessages, message]);
  //   // });
  // }, []);


  // setTimeout(() => {
  //   socket.emit('message', "Hi")
  // }, 3000)

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(250, 250, 250)', }}>
      <View>
        <View style={{ flexDirection: 'row', padding: 10, paddingLeft: 15, backgroundColor: 'lightgray' }}>
          <Text style={{ fontSize: 28, color: 'red', fontWeight: '500' }}>R</Text>
          <Text style={{ fontSize: 28, color: 'green', fontWeight: '500' }}>G</Text>
          <Text style={{ fontSize: 28, color: 'blue', fontWeight: '500' }}>B</Text>
          <Text style={{ fontSize: 28, color: 'black', fontWeight: '500' }}> Display</Text>
        </View>
        <ScrollView horizontal={true} contentContainerStyle={{
          height: 120,
          minWidth: "100%",
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: 0,
          backgroundColor: 'black'
        }}>
          {
            text.split("").map((t, i) => (
              <TouchableOpacity key={i} onPress={() => setTextColorId(i)}>
                <Text style={{
                  color: textColors[i],
                  fontSize: 85,
                  letterSpacing: 5,
                }}>{t}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        <View style={{ marginTop: 25 }}>
          <TextInput
            style={{
              height: 45,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              fontSize: 18
            }}
            onChangeText={(data) => {
              // console.log()
              if (data.length < textColors.length) {
                setTextColors(c => {
                  c.pop();
                  return c;
                })
              }
              setTextColors((t) => {
                // console.log(data.length)
                t[data.length - 1] = '#ffffff';
                return t;
              })
              setText(data)
            }}
            value={text}
          />
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Button color="gray" title="Send" onPress={() => {
              socket.emit('message', { text: text, colors: textColors, speed: speed })
            }
            }></Button>
          </View>
        </View>


        <View style={styles.sectionContainer}>
          <ColorPicker

            color={textColors[textColorsId]}
            onColorChangeComplete={color => setTextColors((d) => {
              // console.log(color)
              let newD = [...d];
              newD[textColorsId] = color;
              return newD;
            })}
            thumbSize={30}
            palette={['#000000', '#0000ff', '#00ff00', '#00ffff', '#ff0000', '#ff00ff', '#ffffff', '#ffff00']}
            sliderSize={30}
            noSnap={true}
            row={false}
          />

        </View>
        <View style={{ marginTop: 290, padding: 20 }}>
          <Text style={{ fontSize: 21 }}>Speed: {speed}</Text>
          <Slider
            value={speed}
            onValueChange={(value) => setSpeed(Math.floor(value))}
            minimumValue={0}
            maximumValue={300}
            minimumTrackTintColor="green"
            thumbTouchSize={{ width: 50, height: 50 }}
          // maximumTrackTintColor="blue"
          />
        </View>

      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
    // height: '30%'
  },
});