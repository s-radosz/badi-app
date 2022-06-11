import { Dimensions } from "react-native";
const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;
export const customBlueColor = "#5e88fc";
export const darkGrayColor = "#424242";
export const lightBorderRadius = 6;
export const fontSizeBig = 24;
export const fontSizeMedium = 20;
export const fontSizeSmall = 16;
export const btnFullActiveWidthContainer = {
  height: 35,
  width: "100%",
  marginTop: 5,
  marginBottom: 5,
  borderRadius: lightBorderRadius,
  borderColor: customBlueColor,
  borderWidth: 2,
  backgroundColor: customBlueColor
};
export const btnFullWidth = {
  height: 45,
  width: "94%",
  marginTop: 15,
  marginBottom: 0,
  marginLeft: "3%",
  marginRight: "3%",
  borderRadius: lightBorderRadius,
  borderColor: customBlueColor,
  borderWidth: 2,
  backgroundColor: customBlueColor,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap"
};

export const btnFullWidthWhite = {
  height: 45,
  width: "94%",
  marginTop: 15,
  marginBottom: 0,
  marginLeft: "3%",
  marginRight: "3%",
  borderRadius: lightBorderRadius,
  borderColor: customBlueColor,
  borderWidth: 2,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap"
};
export const btnFullWidthContainer = {
  height: 35,
  width: "100%",
  marginTop: 5,
  marginBottom: 5,
  borderRadius: lightBorderRadius,
  borderColor: customBlueColor,
  borderWidth: 2,
  backgroundColor: "#fff"
};
export const btnFullWidthFilledContainer = {
  height: 35,
  width: "100%",
  marginTop: 5,
  marginBottom: 5,
  borderRadius: lightBorderRadius,
  borderColor: customBlueColor,
  borderWidth: 2,
  backgroundColor: customBlueColor
};
export const pageTitleBlack = {
  textAlign: "left",
  color: darkGrayColor,
  fontWeight: "800",
  fontSize: fontSizeBig,
  paddingBottom: 30,
  paddingTop: 30,
  paddingLeft: 20,
  // //fontFamily: "Open Sans"
};
export const pageTitleWhite = {
  textAlign: "left",
  color: "#fff",
  fontWeight: "800",
  fontSize: fontSizeBig,
  paddingBottom: 30,
  paddingTop: 30,
  paddingLeft: 20,
  //fontFamily: "Open Sans"
};
/* auctions */
export const productListSingleProductContainer = {
  width: "100%",
  borderWidth: 1,
  flexWrap: "wrap",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-around",
  borderRadius: lightBorderRadius,
  marginBottom: 10,
  borderColor: "#424242",
  paddingLeft: 10
};
export const productListSingleProductImage = {
  width: 50,
  height: 50,
  marginBottom: 10,
  marginTop: 10,
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: 25
};
export const productListSingleProductTextContainer = {
  paddingLeft: 10,
  width: "75%"
};
export const productOnListTextName = {
  fontWeight: "600",
  textAlign: "left",
  color: "#333",
  //fontFamily: "Open Sans"
};
export const productOnListTextCategory = {
  color: "#333",
  textAlign: "left",
  fontSize: 12,
  //fontFamily: "Open Sans"
};
export const productOnListTextPrice = {
  color: "#333",
  textAlign: "left",
  fontSize: 12,
  //fontFamily: "Open Sans"
};
/*list element */
export const listItemContainer = {
  width: "94%",
  marginLeft: "3%",
  marginRight: "3%",
  marginBottom: 10
};
export const listItemSingleContainer = {
  width: "100%",
  borderWidth: 1,
  flexWrap: "wrap",
  alignItems: "center",
  flexDirection: "row",
  borderRadius: lightBorderRadius,
  borderColor: "#424242",
  paddingLeft: 10,
  paddingRight: 10,
  overflow: "hidden"
};
export const listItemSingleContainerActive = {
  width: "100%",
  borderWidth: 1,
  flexWrap: "wrap",
  alignItems: "center",
  flexDirection: "row",
  borderRadius: lightBorderRadius,
  borderColor: "#424242",
  backgroundColor: "#ffeee0",
  paddingLeft: 10,
  paddingRight: 10,
  overflow: "hidden"
};
export const listItemImage = {
  width: 50,
  height: 50,
  marginBottom: 10,
  marginTop: 10,
  borderRadius: 25,
  overflow: "hidden"
};
export const listItemTextContainer = {
  paddingLeft: 10,
  flexWrap: "wrap",
  alignItems: "center",
  flexDirection: "row"
};
export const listItemMainText = {
  fontSize: fontSizeSmall,
  textAlign: "left",
  color: darkGrayColor,
  fontWeight: "400",
  //fontFamily: "Open Sans"
};
export const listItemSubText = {
  fontSize: 10,
  //fontFamily: "Open Sans"
};

/* profile header */
export const profileHeaderContainer = {
  backgroundColor: "#ffd2ad",
  paddingTop: 20,
  paddingBottom: 20
};
export const profileHeaderImage = {
  width: 80,
  height: 80,
  marginBottom: 20,
  borderRadius: 40,
  marginLeft: "auto",
  marginRight: "auto"
};
export const profileHeaderName = {
  color: "#fff",
  textAlign: "center",
  fontWeight: "600",
  fontSize: 24,
  //fontFamily: "Open Sans"
};
export const profileHeaderLocation = {
  color: "#fff",
  textAlign: "center",
  fontSize: 18,
  paddingBottom: 30,
  //fontFamily: "Open Sans"
};
export const profileHeaderInfoContainer = {
  flexWrap: "wrap",
  alignItems: "flex-start",
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%"
};
export const profileHeaderSingleInfoContainerMainText = {
  color: "#fff",
  textAlign: "center",
  fontWeight: "600",
  fontSize: 20,
  //fontFamily: "Open Sans"
};
export const profileHeaderSingleInfoContainerSubText = {
  color: "#fff",
  textAlign: "center",
  fontSize: 16,
  //fontFamily: "Open Sans"
};

/*user preview */
export const userPreviewSectionContainer = {
  paddingLeft: 10,
  paddingRight: 10
};
export const userPreviewSectionDescContainer = {
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: "#ffe4d3",
  paddingBottom: 30,
  paddingTop: 30
};
export const userPreviewSectionHobbyContainer = {
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: "#ffefe2",
  paddingBottom: 30
};
export const userPreviewSectionKidsContainer = {
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: "#fff6ef",
  paddingBottom: 30
};
export const userPreviewSectionHeaderContainer = {
  flexWrap: "wrap",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-start",
  marginBottom: 5,
  marginTop: 20
};
export const userPreviewSectionHeaderImage = {
  width: 45,
  height: 45
};
export const userPreviewSectionHeaderText = {
  fontSize: 24,
  fontWeight: "600",
  paddingLeft: 20,
  color: "#424242",
  //fontFamily: "Open Sans"
};
export const userPreviewListItemContainer = {
  flexWrap: "wrap",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-start",
  paddingLeft: 65
};
export const userPreviewListItemImage = {
  width: 15,
  height: 15,
  marginRight: 10
};
export const userPreviewSectionListText = {
  fontSize: 14,
  color: "#424242",
  //fontFamily: "Open Sans"
};
export const userPreviewDescription = {
  fontSize: 14,
  paddingTop: 10,
  paddingLeft: 10,
  paddingRight: 10,
  textAlign: "center",
  color: "#424242",
  //fontFamily: "Open Sans"
};
export const filterBtnContainer = {
  position: "relative",
  flexWrap: "wrap",
  alignItems: "flex-start",
  flexDirection: "row",
  borderBottomColor: "#E5E5E5",
  borderBottomWidth: 1,
  marginBottom: 10
};
export const singleButtonCol2Container = {
  width: "46%",
  marginLeft: "2%",
  marginRight: "2%",
  marginTop: "3%"
};
export const filterBtnActive = {
  borderBottomColor: customBlueColor,
  borderBottomWidth: 3,
  paddingBottom: 20
};
export const filterBtn = { paddingBottom: 20 };
export const filterBtnTextActive = {
  color: "#333",
  textAlign: "center",
  paddingTop: 7,
  //fontFamily: "Open Sans"
};
export const filterBtnText = {
  color: "#9F9F9F",
  textAlign: "center",
  paddingTop: 7,
  //fontFamily: "Open Sans"
};
export const peachBtnText = {
  color: "#fff",
  textAlign: "center",
  fontSize: 16,
  //fontFamily: "Open Sans"
};
export const whiteBtnText = {
  color: customBlueColor,
  textAlign: "center",
  fontSize: 16,
  //fontFamily: "Open Sans"
};
export const loaderContainer = {
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  width: fullWidth,
  height: fullHeight
};
