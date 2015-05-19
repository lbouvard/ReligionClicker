<?php

function upload(){

    $image_final = "image".$_SESSION['idt'];
    $chemin_final = "images/".$image_final;
    $nom_fichier = basename($_FILES["icone"]["name"]);
    $extension = pathinfo($nom_fichier, PATHINFO_EXTENSION);

    // Allow certain file formats
    if( $extension != "jpg" && $extension != "png" && $extension != "bmp" && $extension != "gif" ) {
        return "Seul les fichiers JPG, BMP, PNG et GIF sont autorisés.";
    }

    $chemin_final = $chemin_final.".".$extension;

    if( !move_uploaded_file($_FILES["icone"]["tmp_name"], $chemin_final) ){
        return "Désolé, une erreur s'est produite pendant le chargement de l'icône";
    }
    else
        $_SESSION['icone'] = $image_final.".".$extension;
}

?>