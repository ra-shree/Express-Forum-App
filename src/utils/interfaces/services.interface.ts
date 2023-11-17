interface Service<T> {
    index(): Promise<T[]>;

    create(item: T): Promise<T>;

    update(key: number, item: T): Promise<T>;

    delete(key: number): Promise<boolean>;

    show(key: number): Promise<T>;
}

export default Service;