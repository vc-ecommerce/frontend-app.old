<template>
  <span>
    <notifications-notif></notifications-notif>
    <notifications-messages></notifications-messages>
  </span>
</template>
<script>
import NotificationsNotif from "./NotificationsNotif";
import NotificationsMessages from "./NotificationsMessages";

export default {
  name: "Notification",
  components: {
    NotificationsNotif,
    NotificationsMessages
  }
}
</script>
