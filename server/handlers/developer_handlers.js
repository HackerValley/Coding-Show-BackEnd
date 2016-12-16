import developerModel from '../models/developer_model';

export default {
  joinProject: (data) => {
    return developerModel.create(data, (err) => {
      if (err) throw err;
    });
  }
}
