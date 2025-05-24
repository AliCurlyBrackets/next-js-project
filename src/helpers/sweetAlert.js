import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});


const sweetAlert = {
    error: (text) => {
        Toast.fire({
            icon: "error",
            background: "#f8d7da",
            color: "#721c24",
            title: text,
            position: "bottom-end",
        });
    },

    success: (text) => {
        Toast.fire({
            icon: "success",
            background: "#d4edda",
            color: "#155724",
            title: text,
            position: "bottom-end",
        });
    },
};

export default sweetAlert;