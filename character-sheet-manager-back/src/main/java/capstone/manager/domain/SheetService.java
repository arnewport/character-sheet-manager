package capstone.manager.domain;

import capstone.manager.data.SheetRepository;
import capstone.manager.models.Sheet;
import org.springframework.stereotype.Service;

@Service
public class SheetService {

    private final SheetRepository repository;

    public SheetService(SheetRepository repository) {
        this.repository = repository;
    }

    public Sheet findById(int id) {
        return repository.findById(id);
    }

    public Result<Sheet> create(Sheet sheet) {

        Result<Sheet> result = validate(sheet);
        if (!result.isSuccess()) {
            return result;
        }

        if (sheet.getId() <= 0) {
            result.addMessage("sheet id is required");
            return result;
        }

        boolean success = repository.update(sheet);
        if (!success) {
            result.addMessage("could not update sheet id " + sheet.getId());
        }

        return result;
    }

    public Result<Sheet> update(Sheet sheet) {
        Result<Sheet> result = validate(sheet);
        if (!result.isSuccess()) {
            return result;
        }

        if (sheet.getId() <= 0) {
            result.addMessage("sheet id is required");
            return result;
        }

        if (!repository.update(sheet)) {
            result.addMessage("could not update sheet id " + sheet.getId());
        }

        return result;
    }

    public boolean deleteById(int id) {
        return repository.deleteById(id);
    }

    // TODO: expand validation
    public Result<Sheet> validate(Sheet sheet) {
        Result<Sheet> result = new Result<>();
        if (sheet == null) {
            result.addMessage("sheet cannot be null");
            return result;
        }
        return result;
    }
}
