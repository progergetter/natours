// updateData
import axios from 'axios';
import { showAlert } from './alerts';

// type is either password or data
export const updateSettings = async (data, type) => {
  const endpoint = type === 'data' ? 'updateMe' : 'updateMyPassword';
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${endpoint}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
