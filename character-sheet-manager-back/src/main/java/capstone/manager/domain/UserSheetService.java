package capstone.manager.domain;


import capstone.manager.data.UserSheetRepository;
import capstone.manager.models.UserSheet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSheetService {

    private final UserSheetRepository repository;

    public UserSheetService(UserSheetRepository repository) {
        this.repository = repository;
    }

    public List<UserSheet> findSheetsByUserId(int userId) {
        return repository.findSheetsByUserId(userId);
    }

    public List<Integer> findUserIdsBySheetId(int sheetId) {
        return repository.findUserIdsBySheetId(sheetId);
    }

    public Result<UserSheet> create(UserSheet userSheet) {

        Result<UserSheet> result = validate(userSheet);
        if (!result.isSuccess()) {
            return result;
        }

        if (userSheet.getId() != 0) {
            result.addMessage("user sheet id cannot be set for `add` operation.");
            return result;
        }

        if (result.isSuccess()) {
            UserSheet us = repository.create(userSheet);
            result.setPayload(us);
        }

        return result;
    }

    public boolean deleteById(int id) {
        return repository.deleteById(id);
    }

    public boolean deleteBySheetId(int sheetId) {
        return repository.deleteBySheetId(sheetId);
    }

    public Result<UserSheet> validate(UserSheet userSheet) {
        Result<UserSheet> result = new Result<>();
        if (userSheet == null) {
            result.addMessage("user sheet cannot be null");
            return result;
        }
        return result;
    }
}
