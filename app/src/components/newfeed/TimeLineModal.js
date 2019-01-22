import React from "react";
import {
    Animated,
    Modal,
    PanResponder,
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Platform
} from "react-native";
import {observer, inject} from "mobx-react/native";
import TimeLineDisplay from "./TimeLineDisplay";
import {timelineData} from "../../data";

const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get('window').height;
const PESPECTIVE = Platform.OS === "ios" ? 2.38 : 1.7;



type State = {
    isShouldVisibleModal: boolean
};
type Props = {
    children?: any,
    timelineStore: any
};



@inject("timelineStore")
@observer
export default class TimeLineModal extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        this.direction = "none";
        this.state = {isShouldVisibleModal: false};
        this.translateY = new Animated.Value(0);
        this.currentIndex = 0;
        this.viewabilityConfig = {
            viewAreaCoveragePercentThreshold: 50
        };

    }

    translateY: Animated.Value;
    currentIndex: number;
    direction: string;

    componentWillMount() {
        this._animatedValue = new Animated.ValueXY();
        this._animatedValue.setValue({x: 0, y: 0});
        this._value = {x: 0, y: 0};

        this._animatedValue.addListener(value => {
            this._value = value;
        });

        this.timelineController = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetResponderCapture: (evt, gestureState) => Math.abs(gestureState.dx) > 60,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
                Math.abs(gestureState.dx) > 60,
            onPanResponderGrant: (e, gestureState) => {
                this._animatedValue.stopAnimation();
                this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
            },
            onPanResponderMove: (e, gestureState) => {
                if (this.direction === "none") {
                    if (Math.abs(gestureState.vy) <= Math.abs(gestureState.vx)) {
                        this.direction = "horizontal";
                    } else {
                        this.direction = "vertical";
                    }
                }
                if (this.direction === "vertical") {
                    if (gestureState.y0 < Dimensions.get("window").height) {
                        if (gestureState.dy >= 0) this.translateY.setValue(gestureState.dy);
                        else {
                            this.translateY.setValue(0);
                        }

                        if (gestureState.dy > Dimensions.get("window").height * 0.2)
                            this.setState({isShouldVisibleModal: true});
                        else {
                            this.setState({isShouldVisibleModal: false});
                        }
                    }
                }
                if (this.direction === "horizontal") {
                    Animated.event([null, {dx: this._animatedValue.x}])(e, gestureState);
                    this._flatList.scrollToOffset({
                        animated: true,
                        offset: this.currentIndex * ITEM_WIDTH - gestureState.dx
                    });

                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                const {x0, y0} = gestureState;
                const {width, height} = Dimensions.get("window");
                // if (y0 < height * 0.7 && y0 > height * 0.3) {
                //   if (x0 > width * 0.6) this.props.timelineStore.nextDisplay();
                //   if (x0 < width * 0.4) this.props.timelineStore.prevDisplay();

                //   return true;
                // }

                this.direction = "none";
                if (gestureState.dx > ITEM_WIDTH / 2) {
                    if (this.currentIndex > 0) {
                        this._flatList.scrollToIndex({
                            animated: true,
                            index: this.currentIndex - 1
                        });
                        this.currentIndex--;
                    }
                } else {
                    if (gestureState.dx < -ITEM_WIDTH / 2) {
                        if (this.currentIndex < timelineData.length - 1) {
                            this._flatList.scrollToIndex({
                                animated: true,
                                index: this.currentIndex + 1
                            });
                            this.currentIndex++;

                        }
                    } else {
                        this._flatList.scrollToIndex({
                            animated: true,
                            index: this.currentIndex
                        });
                    }
                }
                if (this.state.isShouldVisibleModal) {
                    Animated.timing(this.translateY, {
                        toValue: height,
                        duration: 100
                    }).start(() => {
                        this.props.timelineStore.hideModal();
                        this.setState({isShouldVisibleModal: false});
                        this.translateY.setValue(0);
                    });
                } else
                    Animated.timing(this.translateY, {
                        toValue: 0,
                        duration: 100
                    }).start();
                this._animatedValue.setValue({x: 0,y:0});
                this._animatedValue.setOffset({x: 0, y: 0});
            }
        });

    }

    calculateRotation = i => {
        let scrollX = this._animatedValue.x;
        let pageX = - ITEM_WIDTH * i;

        let translateX = scrollX.interpolate({
            inputRange: [pageX - ITEM_WIDTH, pageX, pageX + ITEM_WIDTH],
            outputRange: [(-ITEM_WIDTH/2 - 1) / 3, 0, (ITEM_WIDTH/2 + 1) / 3],
            extrapolate: "clamp"
        });

        let rotateY = scrollX.interpolate({
            inputRange: [pageX - ITEM_WIDTH, pageX, pageX + ITEM_WIDTH],
            outputRange: ["-60deg", "0deg", "60deg"],
            extrapolate: "clamp"
        });

        let translateXAfterRotate = scrollX.interpolate({
            inputRange: [
                pageX - ITEM_WIDTH,
                pageX - ITEM_WIDTH + 0.1,
                pageX,
                pageX + ITEM_WIDTH - 0.1,
                pageX + ITEM_WIDTH
            ],
            outputRange: [
                ITEM_WIDTH/2 + 1,
                (ITEM_WIDTH/2 + 1) / PESPECTIVE,
                0,
                -(ITEM_WIDTH/2 - 1) / PESPECTIVE,
                -ITEM_WIDTH/2 - 1
            ],
            extrapolate: "clamp"
        });

        let opacity = scrollX.interpolate({
            inputRange: [
                pageX - ITEM_WIDTH,
                pageX - ITEM_WIDTH + 10,
                pageX,
                pageX + ITEM_WIDTH - 250,
                pageX + ITEM_WIDTH
            ],
            outputRange: [0, 0.6, 1, 0.6, 0],
            extrapolate: "clamp"
        });

        return {
            transform: [
                {perspective: ITEM_WIDTH},
                {translateX:translateX},
                {rotateY: rotateY},
                {translateX: translateXAfterRotate}
            ],
            opacity: opacity
        };
    };


    render() {
        const {timelineStore} = this.props;

        let backdrop = this.translateY.interpolate({
            inputRange: [0, Dimensions.get("window").height / 2],
            outputRange: ["rgba(0,0,0,1)", "rgba(0,0,0,0)"]
        });
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={timelineStore.modalVisible}
                onRequestClose={() => {
                    timelineStore.hideModal;
                }}
            >
                <Animated.View
                    style={{
                        height: Dimensions.get("window").height,
                        width: Dimensions.get("window").width,
                        position: "absolute",
                        backgroundColor: backdrop
                    }}
                />

                <Animated.View
                    {...this.timelineController.panHandlers}
                    style={[
                        {transform: [{translateY: this.translateY}]},
                        {
                            height: Dimensions.get("window").height,
                            width: Dimensions.get("window").width
                        }
                    ]}
                >
                    <SafeAreaView style={{backgroundColor: "black"}}/>
                    <FlatList
                        ref={ref => (this._flatList = ref)}
                        onScroll={e => {
                            console.log(e.nativeEvent);
                        }}
                        viewabilityConfig={this.viewabilityConfig}
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        style={{height: "100%"}}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        data={timelineData}
                        renderItem={({item, index}) =>
                            <Animated.View
                                style={[
                                    { backgroundColor: "transparent" },
                                    this.calculateRotation(index, false)
                                ]}
                                key={index}
                            >
                                <TimeLineDisplay index={index}/>
                            </Animated.View>
                        }
                    />
                </Animated.View>
            </Modal>
        );
    }
}
