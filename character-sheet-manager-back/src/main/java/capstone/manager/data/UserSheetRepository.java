package capstone.manager.data;

import capstone.manager.models.UserSheet;

import java.util.List;

public interface UserSheetRepository {

    List<UserSheet> findSheetsByUserId(int userId);
    UserSheet create(UserSheet userSheet);
    boolean deleteById(int id);
    boolean deleteBySheetId(int sheetId);

}
