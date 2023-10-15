<template>
    <div>
        <form action="" class="form-inline m-2 bg-white border-0 rounded p-1" method="GET">
            <div class="input-group">
                <input
                    class="border-0"
                    type="search"
                    placeholder="Tìm kiếm..."
                    aria-label="Search"
                    style="outline: none; width: 90%"
                    name="search_query"
                />
                <button type="submit" class="border-0 bg-white">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.input-group {
    flex-wrap: nowrap;
}
</style>
