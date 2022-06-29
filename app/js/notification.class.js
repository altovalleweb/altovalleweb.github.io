class NotificationClass{

  $target
    constructor(){
      this.$target = document.getElementById('notificaciones');
    }
    
    loadNotification(text, notificationClass){
        
        this.$target.innerHTML = text;
        this.$target.classList.add(notificationClass);
        
        this.$target.style.visibility = "visible";
      
        //setTimeout(() => {$target.style.visibility = "hidden";}, 5000);
      
      }

      removeNotification(){
        this.$target.style.visibility = "hidden";

      }





}