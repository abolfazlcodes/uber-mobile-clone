import CustomButton from "@/components/CustomButton";
import { data } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = activeIndex === data.onboarding.length - 1;

  const onPressSkipHandler = () => {
    router.replace("/(auth)/sign-up");
  };

  const onPressNextSlideHandler = () => {
    if (isLastSlide) {
      router.replace("/(auth)/sign-up");
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={onPressSkipHandler}
        className="w-full items-end justify-end p-5"
      >
        <Text className="font-bold text-md font-JakartaBold text-black">
          Skip
        </Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0]" />}
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {data.onboarding.map((item) => (
          <View
            className="flex items-center justify-center mt-10"
            key={item.id}
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get started" : "Next"}
        onPress={onPressNextSlideHandler}
        className="w-11/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
