
export module AppConstants {

    export const LocalStorage = {
        Usuario: 'fp_usuario',
        AppToken: 'fp_app_token'};

    export const MensajeGenericoToast={Error:'<span class="span" tabindex="0"><u>Más detalles:</u></span><p class="alert">mensaje</p>'};
    export const TitulosToastr={Warning:"Advertencia",Error:"Error",Info:"Atención",Success:"Éxito"};

    export const ValidationPatterns = {
      Password:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      Numbers:'^[0-9]{8,11}$',
      PhoneNumber:'[- +()0-9]{7,15}$',
      Numbers2:'^[0-9]+(.[0-9]{0,2})?$',
    }
 
}
