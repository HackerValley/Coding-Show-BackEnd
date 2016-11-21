import userControllers from '../controllers/user_controllers';
import projectControllers from '../controllers/project_controllers';
import commentControllers from '../controllers/comment_controllers';
import developerControllers from '../controllers/developer_controllers';

export default function (app) {
  userControllers(app);
  projectControllers(app);
  commentControllers(app);
  developerControllers(app);
}
