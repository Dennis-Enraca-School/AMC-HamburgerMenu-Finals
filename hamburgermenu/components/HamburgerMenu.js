import {Animated, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Menu, X} from 'lucide-react-native';

const HamburgerMenu = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value (-300))[0];

  const toggleMenu = () => {
    const toValue = menuOpen ? -300 : 0;

    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start()

    setMenuOpen(!menuOpen);

  };

  const menuItems = [
    {id: 1, title: 'Home', screen:'HomeScreen'},
    {id: 2, title: 'Profile', screen:'ProfileScreen'},

  ];
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            {menuOpen ? <X size={24} color= "#000" /> : <Menu size={24} color="#000" />}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My App</Text>
        </View>

        {menuOpen &&(
          <TouchableOpacity 
            onPress = {toggleMenu}
            activeOpacity ={1}
            style = {styles.overlay}
          />
        )
        }

        <Animated.View
          style = {
            [styles.menu, 
              {transform: [
                {translateX: slideAnim}
                ]
              }
            ]
          }
        >
          <ScrollView>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
            </View>

            <View style={styles.menuItems}>
               {menuItems.map((item) => (
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
               ))}
            </View>
          </ScrollView>
        </Animated.View>

      </SafeAreaView>
  );
}
export default HamburgerMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton:{
    padding: 5,
  },
  headerTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0,5)',
    zIndex: 1
  },
  menu : {
    position: 'absolute',
    top: 60,
    left: 0,
    width: 300,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0,5)',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {width:2, height:2},
    shadowRadius: 5,
    elevation: 5,
  },
  menuHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  menuItems: {
    paddingVertical: 10,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
});
