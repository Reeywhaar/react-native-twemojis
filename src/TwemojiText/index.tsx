import * as React from 'react';

//Components
import {Image, Text} from 'react-native';

//Utils
import reactStringReplace from 'react-string-replace';
import emojiUnicode from 'emoji-unicode';

//Styles
import {StyleSheet} from 'react-native';

//Types
import {TextProps, ImageStyle} from 'react-native';

type TwemojiTextProps = {
    twemojiStyle?: ImageStyle;
    children: string;
    base?: string | ((emoji: string) => string);
};

const EMOJI_REGEX =
    /((?:\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+)/g;

const TwemojiText: React.VFC<TextProps & TwemojiTextProps> = ({
    twemojiStyle,
    children,
    base = 'https://twemoji.maxcdn.com/2/72x72/',
    ...props
}) => {
    const textStyle = StyleSheet.flatten(props.style);

    const parts = reactStringReplace(children, EMOJI_REGEX, (emoji, i) => {
        const name = emojiUnicode(emoji).replace(/\s/g, '-');
        return (
            <Image
                key={`emoji-${i}`}
                testID={emoji}
                style={
                    twemojiStyle ?? {
                        width: textStyle?.fontSize ?? 14,
                        height: textStyle?.fontSize ?? 14
                    }
                }
                source={{
                    uri: typeof base === 'function' ? base(name) : `${base}${name}.png`
                }}
            />
        );
    });

    return (
        <Text testID={'text'} {...props}>
            {parts}
        </Text>
    );
};

export default TwemojiText;
