import { supabase } from '../../lib/supabase'
import { Button } from '@rneui/themed'
import { useRouter } from 'expo-router';

export default function SignOut() {
    const router = useRouter();
    const handlePress = () => {
        supabase.auth.signOut()
        router.push('/');
    }

    return (
        <Button onPress={handlePress}>
            Sign Out
        </Button>
    )
}