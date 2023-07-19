<?php require "header.php"; ?>

  <main>
      
    <?php

        if (isset($_SESSION["userId"])) {
            
            echo '<p class="login-status">您已經登錄系統.</p>';
            
        } else {
            
            echo '<p class="logout-status">您已經退出系統.</p>';
            
        }
    
    ?>
   
  </main>

<?php require "footer.php"; ?>
