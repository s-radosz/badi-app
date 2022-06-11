import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions
} from "react-native";
import {
  pageTitleWhite,
  customBlueColor,
  btnFullWidth,
  lightBorderRadius,
  peachBtnText,
  loaderContainer
} from "./../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  singlePostContainer: ViewStyle;
  buttonCloseModal: TextStyle;
  mainModalContainer: TextStyle;
  userDetailsModalContentContainer: ViewStyle;
  relative: ViewStyle;
  addCommentBtn: any;
  addPostBtn: any;
  categoriesListContainer: ViewStyle;
  postDetailsComment: ViewStyle;
  image: ImageStyle;
  activePostCategory: TextStyle;
  pageTitle: any;
  categoryHeaderText: TextStyle;
  singlePostTitle: TextStyle;
  singlePostDate: TextStyle;
  singlePostCommentLength: TextStyle;
  singlePostLikeContainer: ViewStyle;
  singlePostLikeContainerVoteLength: TextStyle;
  singlePostLikeContainerLikeIcon: ImageStyle;
  categoriesListTextHeader: TextStyle;
  singleCategoryOnListContainer: ViewStyle;
  singleCategoryOnListPostsLength: TextStyle;
  postDetailsContainerPadding: ViewStyle;
  postDetailsContainer: ViewStyle;
  postDetailsAuthorContainer: ViewStyle;
  postDetailsAuthorContainerName: TextStyle;
  postDetailsAuthorContainerEmail: TextStyle;
  postDetailsTitle: TextStyle;
  postDetailsDesc: TextStyle;
  postDetailsPostDate: TextStyle;
  postDetailsPostVoteContainer: ViewStyle;
  postDetailsPostVoteWrapper: ViewStyle;
  postDetailsPostVoteCount: TextStyle;
  postDetailsPostVoteImage: ImageStyle;
  postDetailsPostCommentCountWrapper: ViewStyle;
  postDetailsPostCommentCountText: TextStyle;
  postDetailsPostCommentListHeader: TextStyle;
  savePostCommentInput: TextStyle;
  singlePostDetailsCommentUserSectionContainer: ViewStyle;
  singlePostDetailsCommentBody: TextStyle;
  singlePostDetailsCommentVoteContainer: ViewStyle;
  singlePostDetailsCommentVoteWrapper: ViewStyle;
  savePostCommentContainer: ViewStyle;
  savePostCategoryHeaderText: TextStyle;
  savePostCommentDescInput: TextStyle;
  peachBtnText: any;
  optionText: TextStyle;
  optionTextActive: TextStyle;
  savePostInputContainer: ViewStyle;
  savePostCommentInputContainer: ViewStyle;
  conversationDetailsSeeMore: TextStyle;
  loaderContainer: any;
}

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default StyleSheet.create<Style>({
  peachBtnText: peachBtnText,
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  pageTitle: pageTitleWhite,
  addPostBtn: btnFullWidth,
  addCommentBtn: btnFullWidth,
  singlePostContainer: {
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 6,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#424242"
  },
  buttonCloseModal: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 11,
    paddingRight: 3,
    backgroundColor: customBlueColor,
    borderBottomRightRadius: lightBorderRadius
  },
  mainModalContainer: {
    width: fullWidth,
    height: fullHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: -80,
    zIndex: 5
  },
  userDetailsModalContentContainer: {
    backgroundColor: "#fff",
    width: fullWidth - 40,
    height: fullHeight - 300,
    position: "absolute",
    top: fullHeight / 6,
    left: 20,
    zIndex: 10,
    borderRadius: 5
  },
  relative: {
    position: "relative",
    marginBottom: 20
  },
  postDetailsComment: {
    marginBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#424242"
  },
  activePostCategory: { color: "#424242"},
  image: { width: 50, height: 50, borderRadius: 25 },
  categoryHeaderText: {
    paddingTop: 15,
    paddingBottom: 20,
    fontSize: 18,
    textAlign: "center",
    //fontFamily: "Open Sans"
  },
  singlePostTitle: { fontSize: 14},
  singlePostDate: { fontSize: 12},
  singlePostCommentLength: { fontSize: 12},
  singlePostLikeContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  singlePostLikeContainerVoteLength: {
    color: "#f7b67e",
    fontSize: 18,
    //fontFamily: "Open Sans"
  },
  singlePostLikeContainerLikeIcon: { height: 15, width: 30 },
  categoriesListTextHeader: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "600",
    color: "#424242",
    //fontFamily: "Open Sans"
  },
  categoriesListContainer: { marginLeft: 5, marginRight: 5 },
  singleCategoryOnListContainer: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
    borderColor: "#424242"
  },
  singleCategoryOnListPostsLength: { fontSize: 10},
  postDetailsContainerPadding: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  postDetailsContainer: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 10
  },
  postDetailsAuthorContainer: { paddingLeft: 10 },
  postDetailsAuthorContainerName: { fontSize: 16},
  postDetailsAuthorContainerEmail: { fontSize: 12},
  postDetailsTitle: { fontSize: 16, marginBottom: 5 },
  postDetailsDesc: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 14,
    //fontFamily: "Open Sans"
  },
  postDetailsPostDate: {
    marginBottom: 0,
    fontSize: 12,
    //fontFamily: "Open Sans"
  },
  postDetailsPostVoteContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },
  postDetailsPostVoteWrapper: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5
  },
  postDetailsPostVoteCount: {
    color: "#f7b67e",
    fontSize: 18,
    //fontFamily: "Open Sans"
  },
  postDetailsPostVoteImage: { height: 18, width: 30, marginRight: 10 },
  postDetailsPostCommentCountWrapper: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row"
  },
  postDetailsPostCommentCountText: {
    color: "#f7b67e",
    fontSize: 18,
    //fontFamily: "Open Sans"
  },
  postDetailsPostCommentListHeader: {
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "600",
    //fontFamily: "Open Sans"
  },
  savePostCommentInput: {
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    height: 60,
    borderColor: "#424242",
    textAlignVertical: "top"
  },
  savePostCommentDescInput: {
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    height: 60,
    borderColor: "#424242",
    textAlignVertical: "top"
  },
  singlePostDetailsCommentUserSectionContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 10
  },
  singlePostDetailsCommentBody: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 12,
    //fontFamily: "Open Sans"
  },
  singlePostDetailsCommentVoteContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },
  singlePostDetailsCommentVoteWrapper: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5
  },
  savePostCommentContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: 10,
    marginBottom: 15
  },
  savePostCategoryHeaderText: {
    fontWeight: "600",
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    //fontFamily: "Open Sans"
  },
  optionText: { marginTop: 2, marginRight: 15 },
  optionTextActive: { marginTop: 2, marginRight: 15, fontWeight: "600" },
  savePostInputContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  savePostCommentInputContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  conversationDetailsSeeMore: {
    fontWeight: "600",
    color: customBlueColor,
    //fontFamily: "Open Sans"
  },
  loaderContainer: loaderContainer
});
