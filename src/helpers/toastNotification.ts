import { toast } from '@zerodevx/svelte-toast';

export const success = (message: string) => {
	toast.push(message, {
		theme: {
			'--toastBackground': 'linear-gradient(90.32deg, #5557bc 5.48%, #a9697e 94.35%)',
			'--toastWidth': '300px',
			'--toastColor': 'white',
			'--toastBarBackground': '#FDE68A'
		}
	});
};

export const warning = (message: string) => {
	toast.push(message, {
		theme: {
			// '--toastBackground': 'linear-gradient(90.32deg, #5557bc 5.48%, #a9697e 94.35%)',
			'--toastBackground': '#a9697e',
			'--toastWidth': '300px',
			'--toastColor': 'white',
			'--toastBarBackground': '#FDE68A'
		}
	});
};

export const error = (message: string) => {
	toast.push(message, {
		theme: {
			'--toastBackground': '#a9697e',
			'--toastWidth': '300px',
			'--toastColor': 'white',
			'--toastBarBackground': '#FDE68A'
		}
	});
};
