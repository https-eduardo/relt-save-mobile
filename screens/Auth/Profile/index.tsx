import { NavigationProp, Route } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Avatar from "../../../components/Avatar";
import AppTextInput from "../../../components/AppTextInput";
import AppButton from "../../../components/AppButton";
import { styles } from "./styles";

interface ProfileProps {
  route: Route<"Profile", { token: string | null }>;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export default function ProfileScreen({ route, navigation }: ProfileProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  async function loadProfileInfo() {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${route.params.token}`
    );
    const profile = await response.json();
    setUsername(profile.name);
    setEmail(profile.email);
    setProfileUrl(profile.picture);
  }

  useEffect(() => {
    loadProfileInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Avatar avatarUrl={profileUrl}></Avatar>
        <AppTextInput
          label="Nome de usuário"
          value={username}
          placeholder="John Doe"
          block
        ></AppTextInput>
        <AppTextInput
          label="Email"
          placeholder="johndoe@email.com"
          value={email}
        ></AppTextInput>
        <AppButton
          text="Salvar"
          onPress={() => { }}
        ></AppButton>
      </View>
    </View>
  );
}
