export enum Messages {
    Auth_UsernameWrongFormat = 'A felhaszálónévnek 3-15 karakter hosszúnak kell lennie és nem tartalmazhat különleges karaktereket!',
    Auth_UserNameAlreadyTaken = 'A felhasználónév már foglalt!',
    Auth_PasswordWrongFormat = 'A jelszónak legalább 5 karakter hosszúnak kell lennie, tartalmaznia kell kis és nagybetűt és számot!',
    Auth_PasswordWrong = 'Helytelen jelszó!',
    Auth_PasswordsDontMatch = 'A jelszavak nem egyeznek!',
    Auth_SuccessfullRegister = 'Sikeres regisztráció!',
    Auth_SuccessfullLogin = 'Sikeres bejelentkezés!',
    Auth_ErrorWhileRegistering = 'Hiba történt a regisztráció során!',
    Auth_UserNotFoundWithUsername = 'Nem található felhasználó ezzel a felhasználónévvel!',
    Auth_UploadProfileAvatar = 'Kérlek töltsd fel a profilképed!',
    Auth_EmptyFields = 'Kérlek tölts ki minden mezőt az authentikációhoz!',

    Unauthorized = 'Nem vagy bejelentkezve!',
    Loading = 'Gondolkodás...',

    QuizEdit_NameRequired = 'A kvíznek nevet kell adni!',
    QuizEdit_Fail = 'Hiba történt a kvíz szerkesztése során!',
    QuizEdit_Success = 'Sikeres mentés!',

    QuizQuickAction_TogglePrivacy_Success = 'Sikeresen megváltoztattad a kvíz láthatóságát a következőre: %new_value%!',
    QuizQuickAction_TogglePrivacy_Fail = 'Hiba történt a kvíz láthatóságának megváltoztatása során!',
    QuizQuickAction_Delete_Success = 'Kvíz törölve!',
    QuizQuickAction_Delete_Fail = 'Hiba történt a kvíz törlése során!',

    ProfileEdit_NoChanges = 'Nem történt változás!',
    ProfileEdit_SamePassword = 'Az új jelszó nem lehet ugyanaz, mint az előző!',
    ProfileEdit_SuccessfullEdit = 'Sikeres szerkesztés!',
    ProfileEdit_ErrorWhileEditing = 'Hiba történt a szerkesztés során!',
    ProfileEdit_PasswordsNotMatch = 'Az új jelszavak nem egyeznek!',
    ProfileEdit_Deleted = 'Profil törölve!',
    ProfileEdit_DeletionFail = 'Hiba történt a profil törlése során!',

    Image_UploadSuccess = 'Kép feltöltve!',
    Image_UploadInProgress = 'Kép feltöltése folyamatban...',
    Image_UploadFailed = 'Hiba történt a kép feltöltése során!',
    Image_AlreadyUploading = 'Már történik egy képfeltöltés!',

    QuizCreation_UploadImages = 'Kérlek töltsd fel a képeket!',
    QuizCreation_PleaseFillAllFields = 'Kérlek tölts ki minden mezőt!',
    QuizCreation_SuccessfullQuizCreation = 'Sikeres kvíz létrehozás!',
    QuizCreation_QuizNameAlreadyExists = 'A kvíz név már foglalt! Kérlek válassz egy másikat.',
    QuizCreation_ErrorWhileCreatingQuiz = 'Hiba történt a kvíz létrehozása során!',
}
