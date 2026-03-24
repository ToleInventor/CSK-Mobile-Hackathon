import { StyleSheet } from 'react-native'

/*
Primary (Buttons / Highlights) → #3B82F6 (Blue)
Secondary (Accent) → #10B981 (Emerald)
Background → #111827 (Slate 900)
Card / Input Background → #1F2937 (Slate 800)
Text Primary → #F9FAFB (Gray 50)
Text Secondary → #9CA3AF (Gray 400)
Error → #EF4444 (Red)
*/

const colors = {
  primary: "#3B82F6",
  secondary: "#10B981",
  background: "#111827",
  card: "#1F2937",
  text: "#F9FAFB",
  subtext: "#9CA3AF",
  error: "#EF4444",
};

let styles = StyleSheet.create({
  body: {
    backgroundColor: colors.background,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  LogCont: {
    backgroundColor: colors.secondary,
    margin: 20,
    padding: 4,
    borderRadius: 10
  },
  Text: {
    color: colors.text,
    textAlign: 'center'
  },
  Textinput: {
    backgroundColor: colors.card,
    color: colors.text,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.subtext,
  },
  button: {
    backgroundColor: colors.primary,
    margin: 8,
    padding: 5, 
    borderRadius: 10,
    textAlign: 'center',
    width: '50%',
    alignSelf: 'center'
  },
  heading: {
    color: colors.text,
    alignSelf: 'center',
    padding: 20,
    fontSize: 25    
  }
})

export { colors };

export default styles