import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";

export default function InputField() {
    const [text, setText] = useState("");
    const [emotion, setEmotion] = useState("");
    const [confidence, setConfidence] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const predictEmotion = async () => {
        if (!text.trim()) return;

        setLoading(true);
        try {
            const res = await fetch("https://fastapi-app-l7sj.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            const data = await res.json();
            setEmotion(data.emotion);
            setConfidence(data.confidence);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <View className="flex-1 items-center justify-center bg-white px-5">
            <Text className="text-2xl font-bold mb-5">Emotion Detector</Text>

            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Type your text..."
                className="w-full border border-gray-300 rounded-xl p-3 mb-4"
            />

            <TouchableOpacity
                onPress={predictEmotion}
                className="bg-blue-500 px-6 py-3 rounded-xl"
            >
                <Text className="text-white font-semibold">Analyze</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator className="mt-4" />}

            {emotion ? (
                <View className="mt-6 items-center">
                    <Text className="text-lg">Emotion: {emotion}</Text>
                    <Text className="text-gray-600">Confidence: {confidence}%</Text>
                </View>
            ) : null}
        </View>
    )
}