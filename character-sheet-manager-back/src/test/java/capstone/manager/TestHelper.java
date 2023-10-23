package capstone.manager;

import capstone.manager.domain.Result;
import capstone.manager.models.AppUser;
import capstone.manager.models.Sheet;
import capstone.manager.models.UserSheet;

import java.util.List;

public class TestHelper {

    public static Sheet makeSheet(int id) {
        return new Sheet (
                id,
                "Player " + id,
                "Character " + id,
                0,
                0,
                0,
                0,
                0,
                0
        );
    }

    public static UserSheet makeUserSheet(int id, int userId, int sheetId) {
            return new UserSheet (
                    id,
                    userId,
                    sheetId,
                    "OWNER",
                    "NONE"
            );
    }

    public static AppUser makeAppUser(int id) {
        return new AppUser(
                id,
                String.format("appuser%s@app.com", id),
                String.format("password_hash_%s", id),
                true,
                List.of(String.format("TEST_ROLE_%s", id))
        );
    }

    public static <T> Result<T> makeResult(String message, T payload) {
        Result<T> result = new Result<>();
        if (message != null) {
            result.addMessage(message);
        }
        result.setPayload(payload);
        return result;
    }
}
