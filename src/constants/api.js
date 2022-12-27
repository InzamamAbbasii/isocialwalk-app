const BASE_URL = "https://teamsuit.co/isocialwalk/api";
export const api = {
  // users
  signup: BASE_URL + "/users/signup.php",
  signin: BASE_URL + "/users/signin.php",
  otpverification: BASE_URL + "/users/otpverification.php",
  verify_otp: BASE_URL + "/users/verify-otp.php",
  updatepassword: BASE_URL + "/users/updatepassword.php",
  updateprofile: BASE_URL + "/users/updateprofile.php",
  updatedevicetoken: BASE_URL + "/users/updatedevicetoken.php",
  forgetpassword: BASE_URL + "/users/forgetpassword.php",
  changePassword: BASE_URL + "/users/verify-otp(forgetpass).php",
  profileimage: BASE_URL + "/users/profileimage.php",
  get_specific_user: BASE_URL + "/users/getusers.php",
  //Groups
  create_group: BASE_URL + "/groups/create.php",
  group_profileimage: BASE_URL + "/groups/profileimage.php",
  changeprivacy: BASE_URL + "/groups/changeprivacy.php",
  allgroups: BASE_URL + "/groups/allgroups.php",
  showmembers: BASE_URL + "/groups/showmembers.php",
  addmembers: BASE_URL + "/groups/addmembers.php",
  removemember: BASE_URL + "/groups/removemember.php",
  search_group_by_specific_admin:
    BASE_URL + "/groups/allgroupsbyspeciifiadmin.php",
  edit_group_details: BASE_URL + "/groups/editdetails.php",
  join_group: BASE_URL + "/groups/join.php",
  groupsuggestions: BASE_URL + "/groups/groupsuggestions.php",
  deletegroups: BASE_URL + "/groups/deletegroups.php",
  search_group: BASE_URL + "/groups/search.php",
  get_specific_group_members:
    BASE_URL + "/groups/getmembersinspecificgroup.php",

  //notifications
  getAllGroup_notifications: BASE_URL + "/notifications/getallgroup.php",
  get_notifications: BASE_URL + "/notifications/get.php",

  // //Goals
  // add_goals: BASE_URL + '/goals/insert.php',
  // update_goals: BASE_URL + '/goals/update.php',
  // get_user_goals: BASE_URL + '/goals/getusersgoals.php',

  //friends
  getfriendsuggestions: BASE_URL + "/friends/getfriendsuggestions.php",
  getallfriends: BASE_URL + "/friends/getallfriends.php",
  addfriends: BASE_URL + "/friends/addfriends.php",
  approveRequest: BASE_URL + "/friends/updaterequestapprove.php",
  unApproveRequest: BASE_URL + "/friends/updaterequestunapproved.php",
  search_friend: BASE_URL + "/friends/search.php",

  //challenges
  create_challenge: BASE_URL + "/challenges/create.php",
  getSuggestedChallenges: BASE_URL + "/challenges/challengessuggestions.php",
  join_individual_challenge: BASE_URL + "/challenges/joinindiviual.php",
  leave_challenges: BASE_URL + "/challenges/leavechallenges.php",
  search_challenges: BASE_URL + "/challenges/search.php",
  upload_challenge_image: BASE_URL + "/challenges/image.php",
  add_participants_to_Challenge: BASE_URL + "/challenges/addparticipants.php",

  //goals
  add_goals: BASE_URL + "/goals/insert.php",
  update_goals: BASE_URL + "/goals/update.php",
  get_user_goals: BASE_URL + "/goals/getusersgoals.php",
  get_user_daily_goal: BASE_URL + "/goals/getuserdailgoal.php",
  update_daily_weekly_goals: BASE_URL + "/goals/updationweekly.php",

  //Devices
  connect_device: BASE_URL + "/devices/insert.php",
  update_device: BASE_URL + "/devices/update.php",
  delete_device: BASE_URL + "/devices/delete.php",
  get_device_connected: BASE_URL + "/devices/deviceconnected.php",

  //ranking
  get_user_ranking: BASE_URL + "/ranking/usersranking.php",

  //history
  get_history_of_specific_date: BASE_URL + "/history/historyofspecificdate.php",
  get_history_of_specific_year: BASE_URL + "/history/historyofspecificyear.php",
  get_history_btw_two_dates:
    BASE_URL + "/history/historybetweentwospecificdates.php",
  get_history_of_week: BASE_URL + "/history/historyofweek.php",
};
