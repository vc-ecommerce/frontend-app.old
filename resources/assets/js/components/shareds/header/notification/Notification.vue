<template>
    <span>
        <notification-notif/>
        <notification-messages/>
    </span>
</template>
<script>
    import NotificationsNotif from './NotificationsNotif';
    import NotificationsMessages from './NotificationsMessages';

    export default {
        components: {
            'notification-notif': NotificationsNotif,
            'notification-messages': NotificationsMessages
        }
    }
</script>
