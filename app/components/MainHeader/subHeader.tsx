import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@rneui/themed';
import { usePathname } from 'expo-router';

export default function SubHeader() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Link href='/dashboard' style={[styles.link, pathname === '/' && styles.activeLink]}>
          <Text style={styles.text}>Dashboard</Text>
        </Link>
        {pathname === '/dashboard' && <View style={[styles.activeUnderline, { zIndex: 1 }]}></View>}
      </View>

      <View style={styles.linkContainer}>
        <Link href='/newappli' style={[styles.link, pathname === '/newappli' && styles.activeLink]}>
          <Ionicons name="add-outline" size={24} color="#2037AA" />
        </Link>
        {pathname === '/newappli' && <View style={[styles.activeUnderline, { zIndex: 1 }]}></View>}
      </View>

      <View style={styles.borderShadow}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    backgroundColor: '#E5E5F9',
    alignItems: 'center',
    position: 'relative',
  },
  linkContainer: {
    paddingBottom: 16,
    position: 'relative',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2037AA',
  },
  borderShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#A4AFC4',
  },
  activeLink: {
    fontWeight: 'bold',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#2037AA',
  },
});
