package capstone.manager.data;

import capstone.manager.models.Sheet;

public interface SheetRepository {

    Sheet findById(int id);
    Sheet create(Sheet sheet);
    boolean update(Sheet sheet);
    boolean deleteById(int id);

}
